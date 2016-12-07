
window.onload = function () {
    var
        id,
        con = document.getElementById('content'),
        item = document.getElementById('item');

    item.addEventListener(
        'dragstart',
        function (e) {
            window.e = e;
            e.dataTransfer.setData('id', e.target.id);
        }
    )
    con.addEventListener(
        'dragover',
        function (e) {
            e.preventDefault();
        })
    con.addEventListener(
        'drop',
        function (e) {
            id = e.dataTransfer.getData('id');
            e.target.appendChild(document.getElementById(id));
            e.preventDefault();
        })
}
