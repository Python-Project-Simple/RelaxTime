# -*- coding: utf-8 -*-

import thread
from http_client import HttpClient

def niceview_svr():
    '''
    同步实现 图片获取
    :return: 状态码和图片信息,
    '''
    header = {
        "apikey": "af8a128ea2f8f494cf7ab9456208a762",
        "Content-Type": "application/json"
    }
    host = 'apis.baidu.com'
    url = '/txapi/mvtp/meinv?num=1'
    http_cli = HttpClient(host, 80, 30)
    http_res = http_cli.send_request(url, 'GET', header=header)

    ret = {}
    ret["status"] = http_res["status"]
    if ret["status"] != 200:
        return ret
    ret["picUrl"] = http_res["body"]["newslist"][0]["picUrl"]
    ret["title"] = http_res["body"]["newslist"][0]["title"]
    return ret

# test demo
if __name__ == '__main__':
    print niceview_svr()
