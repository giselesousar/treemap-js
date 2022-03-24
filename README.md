# Treemap-js

### How to use
#### Generate JSON
install dependencies 
```
pip install pydriller
```
```
sudo apt install tree
```
set environment variables for the url of the repository to be analyzed and the metric used for generating the heatmap (frequency | complexity | loc_changes | composition)
```
export REPOSITORY_URL=https://github.com/apache/cassandra
export HEATMAP_METRIC=COMPLEXITY 
```
run with sudo privileges in /scripts directory
```
sudo python3 json-generator.py
```
#### Render treemap
include treemap.bundle.js from dist directory in your html page
```html
<script src="treemap.bundle.js"></script>
```
get json data and render treemap into DOM
```js
// import JSON
import data from '/scripts/cassandra.json';

// create json tree object
const tree = treemap.create(data);

// render treemap into dom element
treemap.render(tree, document.querySelector('.root'));
```
### Example 
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Treemap</title>
  </head>
  <body>
    <div class="root" style="height: 100vh"></div>

    <script type="text/javascript" src="treemap.bundle.js"></script>
    <script type="text/javascript">
      fetch('cassandra.json')
      .then((res)=> {
        return res.text();
      })
      .then((data) => {
        const heatmapMetric = 'FC';
        treemap.render(data, document.querySelector('.root'), heatmapMetric);
      })
      .catch((err) => {
        console.log(err);
      });
    </script>
  </body>
</html>
```
### Output
![Treemap](img/cassandra_root_2.png)

### For development install dependencies and run scripts
```
$ npm install

$ npm run serve
$ npm run build

open http://localhost:3000/
```
