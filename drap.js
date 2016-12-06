
var getScrollOffsets = function () {
    if (window.pageXOffset !== null) {
        return (
            {
                x: window.pageXOffset,
                y: window.pageYOffset
            }
        )
    }
    return null;
}


var drag = function (e, element2Drag) {
    var
        scroll = getScrollOffsets(),
        scrollX = scroll.x,
        scrollY = scroll.y,
        startX = e.clientX + scrollX,
        startY = e.clientY + scrollY,
        origX = element2Drag.offsetLeft,
        origY = element2Drag.offsetTop,
        deltaX = startX - origX,
        deltaY = startY - origY,
        style;

    if (document.addEventListener) {
        document.addEventListener('mousemove', moveHandler, true);
        document.addEventListener('mouseup', upHandler, true);
    }

    e.stopPropagation && e.stopPropagation();
    e.preventDefault && e.preventDefault();

    function moveHandler(e) {
        style = element2Drag.style;
        scrollX = getScrollOffsets().x;
        scrollY = getScrollOffsets().y;
        moveX = e.clientX + scrollX;
        moveY = e.clientY + scrollY;
        style.left = moveX - startX + origX + 'px';
        style.top = moveY - startY + origY + 'px';

        e.stopPropagation && e.stopPropagation();
    }

    function upHandler(e) {
        if (document.removeEventListener) {
            document.removeEventListener('mousemove', moveHandler, true);
            document.removeEventListener('mouseup', upHandler, true);
        }

        e.stopPropagation && e.stopPropagation();
    }

}

document.getElementById('drag')
    .onmousedown = function (e) {
        drag(e, this);
    }

























var mergeSort = function (arr) {
    // if (len <= 1) {
    //     return arr
    // }
    // //[0,mid) [mid,len)
    // var mid = Math.floor(len / 2)
    // selectSort(arr.splice(0, mid), mid)
    // selectSort(arr, len - mid)

    function _sort(arr, head, mid, foot) {
        // var _arr = []
        // var i = 0, j = 0, len = arr1.length
        // if (len !== arr2.length) return new Error('length error')
        // var _min
        // for (; i < len; i++) {
        //     _min = arr1[i]
        //     for (; j < len; j++) {
        //         if (arr2[j] > arr1[i]) break
        //         _min = arr2[j]
        //         _arr.push(_min)
        //     }
        //     _arr.push(_min)
        // }
        var _arr = arr.slice(head, foot)
        var j = head, k = mid - 1, i = 0
        for (; i < arr.length; i++) {
            if (j >= mid - 1) {
                arr[i] = _arr[j]
                j++
            } else if (k > foot) {
                arr[i] = _arr[k]
                k++
            } else if (_arr[j - head] < _arr[k - head]) {
                arr[i] = _arr[j - head]
                j++
            } else if (_arr[k - head] < _arr[j - head]) {
                arr[i] = _arr[k - head]
                k++
            }
        }
    }

    function _merge(arr, head, foot) {
        if (foot <= head) return

        var mid = (foot + head) / 2
        _merge(arr, head, mid)
        _merge(arr, mid + 1, foot)
        _sort(arr, head, mid, foot)
    }
    var len = arr.length;
    _merge(arr, 0, len - 1)
    return arr
}