// https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event
const source = document.querySelector('article');
if (source) {
    source.addEventListener('copy', (event) => {
        const selection = document.getSelection();
        event.clipboardData.setData('text/plain', selection.toString() + `\n\n转自 ${window.location.toString()}, 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`);
        event.preventDefault();
        console.log(event.clipboardData);
    });
}
