figma.showUI(__html__,{width:250,height:390}),figma.ui.onmessage=e=>{if("create-rectangles"===e.type){const t=[];for(let i=0;i<e.count;i++){const e=figma.createRectangle();e.x=150*i,e.fills=[{type:"SOLID",color:{r:1,g:.5,b:0}}],figma.currentPage.appendChild(e),t.push(e)}figma.currentPage.selection=t,figma.viewport.scrollAndZoomIntoView(t)}figma.closePlugin()};