function addProject(data) {
    var source = document.getElementById("project-template").innerHTML;
    var template = Handlebars.compile(source);
    document.getElementById("projects").innerHTML += template(data);
}

fetch("/projects.json").then(res => res.json()).then(json => {json.map((project => {addProject(project)}))});

let pos = { top: 0, left: 0, x: 0, y: 0 };
let ele = document.getElementById("projects")
// ele.scrollTop = 100;
ele.scrollLeft = 150;

const mouseDownHandler = function (e) {
    pos = {
        // The current scroll
        left: ele.scrollLeft,
        // top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    // ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
};

const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');
};

document.addEventListener("mousedown", mouseDownHandler)