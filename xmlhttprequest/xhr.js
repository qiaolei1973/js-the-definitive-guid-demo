
var ajax = function () {
    var
        req = new XMLHttpRequest(),
        url = '',
        param = null,
        method = 'POST',
        asyn = true,
        type,
        callback = function (data) {
            console.log(data);
        };

    //拼接get url
    if ((!method || method === 'GET') && data) {
        url = url + '?' + encodeFormData(data);
    }
    /**
     * 指定请求
     */
    req.open(method, url, asyn, username, password);
    //设置请求头
    if (method === 'POST') {
        //表单请求
        // req.setRequestHeader(
        //     'Content-Type', 'application/x-www-form-urlencoded'
        // );
        // data = encodeFormData(data);
        
        //json请求
        req.setRequestHeader(
            'Content-Type', 'application/json'
        )
        data = JSON.stringify(data);
    }
    //监听readystatechange事件
    req.onreadystatechange = function () {
        /**
         * readyState:
         * 0 UNSENT open尚未调用前
         * 1 OPENED open已调用
         * 2 HEADERS_RECEIVED 接收到头信息
         * 3 LOADING 接收到响应主体
         * 4 DONE 响应完成
         */
        if (req.readyState === 4 &&
            req.status === 200) {
            type = req.getResponseHeader('Content-Type');
            //响应格式
            if (type.lastIndexOf('xml') !== -1 && req.responseXML) {
                //xml
                callback(req.responseXML)
            } else if (type === 'application/json') {
                //json
                callback(JSON.parse(req.responseText));
            } else {
                //text
                callback(req.responseText);
            }
        }
    }
    //发送请求至服务器
    if (method === 'GET') {
        req.send(null);
    } else {
        req.send(data);
    }
    //同步ajax
    if (!asyn) {
        //type = req.getResponseHeader('Content-Type');
        if (req.status === 200) {
            return req.responseText;
        }
        return null;
    }
}

//json参数转化为encode 格式的url的工具函数
function encodeFormData(data) {
    if (!data) {
        return ''
    }
    var
        pairs = [],
        value,
        name;
    for (name in data) {
        if (!data.hasOwnProperty(name)) {
            continue;
        } else if (typeof data[name] === 'function') {
            continue;
        }
        value = data[name].toString();
        name = encodeURIComponent(name.replace('%20', '+'));
        value = encodeURIComponent(value.replace('%20', '+'));
        pairs.push(name + '=' + value);
    }
    return pairs.join('&');
}
