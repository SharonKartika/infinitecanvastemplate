const getRandomString = (n=10) => [...Array(n)].map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 62))).join('');
let getTranslateValues = (translateStr) => {
    return translateStr.slice(10, -1).split(',').map(val => parseInt(val));
}
let zoomcontainer = document.createElement("div")
let translatecontainer = document.createElement("div")
let nodecontainer = document.createElement("div")
let controlscontainer = document.createElement("div")

const renderControls = () => {
    controlscontainer.id = "controlscontainer"
    for (let i = 0; i < 7; i++){
        let addbutton = document.createElement('button')
        addbutton.innerHTML = getRandomString(1).toUpperCase()
        controlscontainer.appendChild(addbutton)
    }

}
renderControls()

const initialOffsetFactor = 5
translatecontainer.xtranslate = window.innerWidth* initialOffsetFactor; 
translatecontainer.ytranslate = window.innerHeight*initialOffsetFactor;
let displaynodes = []
let N = 100;
const renderNodes = ()=> {
    for (let i= 0; i < N; i++){
        let node = document.createElement('div');
        node.classList.add('node');
        node.innerHTML = getRandomString(2)
        node.xtranslate = Math.random()*window.innerWidth
        node.ytranslate = Math.random()*window.innerHeight
        node.style.transform = `translate(${node.xtranslate}px, 
                                          ${node.ytranslate}px)`     
        displaynodes[i] = node;
        nodecontainer.appendChild(node);
    }
}

let ghostnodes = []
const renderGhostNodes = () => {
    for (let i = 1; i < 3; i++){
        ghostnodes[i] = document.createElement("div");
        ghostnodes[i].innerHTML = ''
        ghostnodes[i].classList.add("ghostnode")
        nodecontainer.appendChild(ghostnodes[i]);
    }

    ghostnodes[1].posx = window.innerWidth*initialOffsetFactor; 
    ghostnodes[1].posy = window.innerHeight/2;
    ghostnodes[2].posx = window.innerWidth/2; 
    ghostnodes[2].posy = window.innerHeight*initialOffsetFactor;

    ghostnodes[1].style.transform = `translate(${ghostnodes[1].posx}px, ${ghostnodes[1].posy}px)`
    ghostnodes[2].style.transform = `translate(${ghostnodes[2].posx}px, ${ghostnodes[2].posy}px)`
}

renderNodes();
renderGhostNodes();
translatecontainer.appendChild(nodecontainer)
zoomcontainer.appendChild(translatecontainer)
maincontainer.appendChild(zoomcontainer)
maincontainer.appendChild(controlscontainer)

translatecontainer.style.transform =  `translate(${translatecontainer.xtranslate}px,${translatecontainer.ytranslate}px)`

let maxxscrollposition = document.documentElement.scrollWidth - window.innerWidth;
let maxyscrollposition = document.documentElement.scrollHeight - window.innerHeight;
// window.scrollTo(maxxscrollposition, maxyscrollposition);
window.scrollTo(maxxscrollposition/2 + window.innerWidth/2,
                maxyscrollposition/2 + window.innerHeight/2);


window.addEventListener('scroll', (e)=>{
    if (window.scrollY >= maxyscrollposition){
        ghostnodes[2].posy += 200;
        ghostnodes[2].style.transform = `translate(${ghostnodes[2].posx}px, ${ghostnodes[2].posy}px)`
        maxyscrollposition = document.documentElement.scrollHeight - window.innerHeight;
    } else if (window.scrollY <= 0) {
        translatecontainer.ytranslate += 200
        window.scrollBy(0, 200)
        translatecontainer.style.transform = `translate(${translatecontainer.xtranslate}px,${translatecontainer.ytranslate}px)`
        maxyscrollposition = document.documentElement.scrollHeight - window.innerHeight;
    }

    if (window.scrollX >= maxxscrollposition){
        ghostnodes[1].posx += 200;
        ghostnodes[1].style.transform = `translate(${ghostnodes[1].posx}px, ${ghostnodes[1].posy}px)`
        maxxscrollposition = document.documentElement.scrollWidth - window.innerWidth;
    }  else if (window.scrollX <= 0) {
        translatecontainer.xtranslate += 200
        window.scrollBy(200, 0)
        translatecontainer.style.transform = `translate(${translatecontainer.xtranslate}px,${translatecontainer.ytranslate}px)`
        maxxscrollposition = document.documentElement.scrollWidth - window.innerWidth;
    }
    }
)

let draggedNode = null;
let startX, startY, initialX, initialY;
window.addEventListener('mousedown', (e)=>{
    if (e.target.closest('.node')){
        draggedNode = e.target.closest('.node');
        startX = e.clientX
        startY = e.clientY
        initialX = draggedNode.xtranslate
        initialY = draggedNode.ytranslate
    }
})

window.addEventListener('mousemove', (e)=>{
    if (draggedNode){
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        draggedNode.xtranslate = initialX + dx 
        draggedNode.ytranslate = initialY + dy 
        draggedNode.style.transform = `translate(${draggedNode.xtranslate}px, ${draggedNode.ytranslate}px)`
    }
})

window.addEventListener('mouseup', (e)=>{
    if (draggedNode){
        draggedNode = null
    }
})

window.addEventListener('touchstart', (e)=>{
    if (e.target.closest('.node')){
        draggedNode = e.target.closest('.node');
        startX = e.touches[0].clientX
        startY = e.touches[0].clientY
        initialX = draggedNode.xtranslate
        initialY = draggedNode.ytranslate
    }
})

window.addEventListener('touchmove', (e)=>{
    if (draggedNode){
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        draggedNode.xtranslate = initialX + dx 
        draggedNode.ytranslate = initialY + dy 
        draggedNode.style.transform = `translate(${draggedNode.xtranslate}px, ${draggedNode.ytranslate}px)`
    }
})

window.addEventListener('touchend', (e)=>{
    if (draggedNode){
        draggedNode = null
    }
})
