let myHtml5 = String(`<!doctype html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>板娘</title>
            <script src="https://eqcn.ajz.miesnfu.com/wp-content/plugins/wp-3d-pony/live2dw/lib/L2Dwidget.min.js"></script>
            <script>
                L2Dwidget.init({
                    "model": {
                        jsonPath: "https://unpkg.com/live2d-widget-model-shizuku/assets/shizuku.model.json",
                        "scale": 0.5
                    },
                    "display": {
                        "position": "right",
                        "width": 100,
                        "height": 200,
                        "hOffset": -10,
                        "vOffset": -10
                    },
                    "mobile": {
                        "show": true,
                        "scale": 0.5
                    },
                    "react": {
                        "opacityDefault": 0.7,
                        "opacityOnHover": 0.3
                    }
                });
            </script>
            <style>.snow-container{position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:100001; background-color: rgba(0, 0, 0, 0.2)}</style>
        </head>
        <body>
            <div class="snow-container"></div>
        </body>
    </html>
`)

export default  myHtml5