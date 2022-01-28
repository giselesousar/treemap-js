# treemap-js

### Example 
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Treemap</title>
  </head>
  <body>
    <div class="root" style="height: 100vh; width: 100vw;"></div>

    <script type="text/javascript" src="treemap.js"></script>
    <script type="text/javascript">
      fetch('example.json')
      .then((res)=> {
        return res.text();
      })
      .then((data) => {
        const tree = treemap.create(data);
        treemap.render(tree, document.querySelector('.root'));
      })
      .catch((err) => {
        console.log(err);
      });
    </script>
  </body>
</html>
```
### Output
![Treemap](img/example.png)

### For development install dependencies and run scripts
```
$ npm install

$ npm run serve
$ npm run build

open http://localhost:3000/
```
