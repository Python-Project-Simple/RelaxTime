function ip2long(IP) {
    //  discuss at: http://phpjs.org/functions/ip2long/
    // original by: Waldo Malqui Silva
    // improved by: Victor
    //  revised by: fearphage (http://http/my.opera.com/fearphage/)
    //  revised by: Theriault
    //   example 1: ip2long('192.0.34.166');
    //   returns 1: 3221234342
    //   example 2: ip2long('0.0xABCDEF');
    //   returns 2: 11259375
    //   example 3: ip2long('255.255.255.256');
    //   returns 3: false

    var i = 0;
    // PHP allows decimal, octal, and hexadecimal IP components.
    // PHP allows between 1 (e.g. 127) to 4 (e.g 127.0.0.1) components.
    IP = IP.match(
        /^([1-9]\d*|0[0-7]*|0x[\da-f]+)(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?$/i
    ); // Verify IP format.
    if (!IP) {
        return false; // Invalid format.
    }
    // Reuse IP variable for component counter.
    IP[0] = 0;
    for (i = 1; i < 5; i += 1) {
        IP[0] += !!((IP[i] || '')
            .length);
        IP[i] = parseInt(IP[i]) || 0;
    }
    // Continue to use IP for overflow values.
    // PHP does not allow any component to overflow.
    IP.push(256, 256, 256, 256);
    // Recalculate overflow of last component supplied to make up for missing components.
    IP[4 + IP[0]] *= Math.pow(256, 4 - IP[0]);
    if (IP[1] >= IP[5] || IP[2] >= IP[6] || IP[3] >= IP[7] || IP[4] >= IP[8]) {
        return false;
    }
    return IP[1] * (IP[0] === 1 || 16777216) + IP[2] * (IP[0] <= 2 || 65536) + IP[3] * (IP[0] <= 3 || 256) + IP[4] * 1;
}
function long2ip(proper_address) {
    proper_address = proper_address >>> 0;
    var output = false;  // www.jbxue.com

    if (!isNaN(proper_address) && ( proper_address >= 0 || proper_address <= 4294967295 )) {
        output = Math.floor(proper_address / Math.pow(256, 3)) + '.' +
            Math.floor(( proper_address % Math.pow(256, 3) ) / Math.pow(256, 2)) + '.' +
            Math.floor(( ( proper_address % Math.pow(256, 3) ) % Math.pow(256, 2) ) /
                Math.pow(256, 1)) + '.' +
            Math.floor(( ( ( proper_address % Math.pow(256, 3) ) % Math.pow(256, 2) ) %
                Math.pow(256, 1) ) / Math.pow(256, 0));
    }

    return output;
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0; // Hack to convert O.length to a UInt32
        if ({}.toString.call(callback) != "[object Function]") {
            throw new TypeError(callback + " is not a function");
        }
        if (thisArg) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}


Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
    return index;
};

function Map() {
    this.container = new Object();
}


Map.prototype.put = function (key, value) {
    this.container[key] = value;
}


Map.prototype.get = function (key) {
    return this.container[key];
}


Map.prototype.keySet = function () {
    var keyset = new Array();
    var count = 0;
    for (var key in this.container) {
// 跳过object的extend函数
        if (key == 'extend') {
            continue;
        }
        keyset[count] = key;
        count++;
    }
    return keyset;
}


Map.prototype.size = function () {
    var count = 0;
    for (var key in this.container) {
// 跳过object的extend函数
        if (key == 'extend') {
            continue;
        }
        count++;
    }
    return count;
}


Map.prototype.remove = function (key) {
    delete this.container[key];
}


Map.prototype.toString = function () {
    var str = "";
    for (var i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
        str = str + keys[i] + "=" + this.container[keys[i]] + ";\n";
    }
    return str;
}
