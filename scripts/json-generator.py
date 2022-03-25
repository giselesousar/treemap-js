import os
import json
from enum import Enum
from pathlib import Path
from pydriller import Repository
from subprocess import check_output

class Type(Enum):
  DIR = 0
  FILE = 1

class HeatmapMetric(Enum):
  FREQUENCY = 0
  COMPLEXITY = 1
  LOC_CHANGES = 2

class Node:
  def __init__(self, name, loc, heatmap, node_type, depth, children = []):
    self.name = name
    self.loc = loc
    self.node_type = node_type
    self.depth = depth
    self.children = children
    self.parent = None
    self.heatmap = heatmap
  
  def append_node(self, node):
    node.parent = self
    self.children.append(node)

def create_json_object(node):
  return {
    "name": node.name,
    "type": node.node_type.name,
    "weight": node.loc,
    "depth": node.depth,
    "heatmap": node.heatmap,
    "children": []
  }

def traverse(node):
  children = []
  for child in node.children:
    node = create_json_object(child)
    children.append(node)
    node["children"] = traverse(child)
  return children

def create_json(root):
  json_output = create_json_object(root)
  json_output["children"] = traverse(root)

  with open(f'{root.name}.json', 'w') as outfile:
    outfile.write(json.dumps(json_output))

  print(f"Analysis completed. Available in: {root.name}.json")

def should_ignore(name):
  list_of_files_and_directories_to_ignore = ['.git']
  return True in [i in name for i in list_of_files_and_directories_to_ignore]

def count_lines_of_code_of_files(name):
  os.system(f"find {name} | xargs wc -l > locfiles.txt")
  with open("locfiles.txt", "r") as locfiles:
    return locfiles.readlines()[:-1]

def get_list_of_commits(name):
  limit = 100
  commits = []
  for commit in Repository(name, order='reverse').traverse_commits():
    if limit == 0:
      break
    commits.append(commit)
    limit -= 1
  return commits

def get_files_frequency_in_commits(name):
  file_frequency = {}
  for commit in get_list_of_commits(name):
    for modified_file in commit.modified_files:
      if modified_file.filename in file_frequency.keys():
        file_frequency[modified_file.filename] += 1
      else:
        file_frequency[modified_file.filename] = 1
  return file_frequency

def get_number_of_lines_of_code_changes_in_commits(name):
  number_of_line_changes = {}
  for commit in get_list_of_commits(name):
    for modified_file in commit.modified_files:
      if modified_file.filename in number_of_line_changes.keys():
        number_of_line_changes[modified_file.filename] += modified_file.added_lines + modified_file.deleted_lines
      else:
        number_of_line_changes[modified_file.filename] = modified_file.added_lines + modified_file.deleted_lines
  return number_of_line_changes

def get_files_cyclomatic_complexity_in_commits(name):
  complexity = {}
  for commit in get_list_of_commits(name):
    for modified_file in commit.modified_files:
      complexity[modified_file.filename] = 0 if modified_file.complexity is None else modified_file.complexity
  return complexity

def calculate_loc_tree(node):
  loc = 0
  for each in node.children:
    loc += each.loc + calculate_loc_tree(each)
  if len(node.children) > 0:
    node.loc = loc
  if node.parent is not None:
    return loc

def create_tree(name, list_of_files_and_directories, list_locs_of_files, dict_of_heatmap_metric):

  root = Node(name=name,loc=0, heatmap=1, node_type=Type.DIR, depth=0, children=[])

  nodes = [root]

  for key in list_of_files_and_directories:
    last_name = key.split('/')[-1]
    depth = key.count('/')
    loc = 0
    heatmap = 0

    if os.path.isdir(key):
      key_type = Type.DIR
      heatmap = 0
    else:
      key_type = Type.FILE
      if key in list_locs_of_files:
        loc = list_locs_of_files[key]
      if last_name in dict_of_heatmap_metric:
        heatmap = dict_of_heatmap_metric[last_name]

    if depth != len(nodes):
      diff = abs(depth - len(nodes))
      if depth < len(nodes):
        for i in range(0, diff):
          nodes.pop()
      else:
        nodes.append(node)

    node = Node(name=last_name, loc=loc, heatmap=heatmap, node_type=key_type, depth=depth, children=[])

    if len(nodes) > 0:
      nodes[len(nodes) - 1].append_node(node)

  calculate_loc_tree(root)
  return root

def get_list_of_files_loc(name):
    list_locs_of_files = {}

    for each in count_lines_of_code_of_files(name):
        if not should_ignore(each):
            elements = each.split(' ') 
            if(elements[-1] != "" and elements[-2] != ""):
                list_locs_of_files[elements[-1].replace('\n', '')] = int(elements[-2])
    return list_locs_of_files

def get_list_of_files_and_directories(name):
  list_of_files_and_directories = check_output(f"cd {name} && tree -i -f", shell=True).decode("utf-8").splitlines()
  return [each.replace('./', name + '/') for each in list_of_files_and_directories][1:-2]

def analize_repository(name, heatmap_metric):
  print("Analyzing...")
  dict_of_heatmap_metric = {}

  if heatmap_metric == HeatmapMetric.FREQUENCY:
    dict_of_heatmap_metric = get_files_frequency_in_commits(name)
  elif heatmap_metric == HeatmapMetric.COMPLEXITY:
    dict_of_heatmap_metric = get_files_cyclomatic_complexity_in_commits(name)
  elif heatmap_metric == HeatmapMetric.LOC_CHANGES:
    dict_of_heatmap_metric = get_number_of_lines_of_code_changes_in_commits(name)
  else:
    raise IndexError
  
  root = create_tree(name, get_list_of_files_and_directories(name), get_list_of_files_loc(name), dict_of_heatmap_metric)
  create_json(root)

def clone_repository(url, name, heatmap_metric):
  try:
    print("Cloning repository...")
    os.system(f"git clone {url}")
    analize_repository(name, heatmap_metric)
  except IndexError:
    print("Heatmap metric is out of range")
  
  finally:
    os.system(f"rm -r {name}")
    os.system(f"rm -r locfiles.txt")

def initialize():
  url = os.environ['REPOSITORY_URL']
  name = url.split('/')[-1]
  heatmap_metric = os.environ['HEATMAP_METRIC']
  return url, name, heatmap_metric
def run():
  try:
    url, name, heatmap_metric = initialize()
    try:
      heatmap_metric = HeatmapMetric[heatmap_metric.upper()]
      clone_repository(url, name, heatmap_metric)
    except KeyError as e:
      print(f"Heatmap metric is out of range: {e}")
  except KeyError as e:
    print(f"Environmental variable was not properly assigned: {e}")

if __name__ == "__main__":
  run()