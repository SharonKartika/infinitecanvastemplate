`position: fixed` implies that the element is placed out of the normal document flow: no space created for it in the document. Which means no scroll bars (how does that follow though?)

`position: absolute` on nodes let you control their y positions manually. Only x positions can be controlled otherwise.

Page structure: 
```
maincontainer #from html
    zoomcontainer #scale (zoom) controls
        translatecontainer #translate controls
            nodecontainer #contains the nodes 
```