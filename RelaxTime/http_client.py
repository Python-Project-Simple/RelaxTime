# -*- coding: utf-8 -*-

import json
import time
import httplib
import traceback

class HttpClient(object):

    def __init__(self, host, port, timeout, header=None):
        self.host = host
        self.port = port
        self.timeout = timeout
        if header is None:
            self.header = {
                "Content-Type": "application/json"
            }

    def send_request(self, url, method, body=None, header=None):
        '''

        :param url:
        :param method: HTTP request method
        :param body: a dict of body argument
        :param header: a dict of header argument
        :return: a dict of response
        '''
        try:
            if header is None:
                header = self.header
            if body is None:
                body = {}
            body_json = json.dumps(body)
            _httpClient = httplib.HTTPConnection(self.host, self.port, timeout=self.timeout)

            begin_time = time.time()
            _httpClient.request(method, url, body_json, header)
            _response = _httpClient.getresponse()
            res_body = _response.read()
            end_time = time.time()

            res = {}
            res['status'] = _response.status
            res['reason'] = _response.reason
            res['time'] = end_time - begin_time
            res['body'] = json.loads(res_body)
            return res
        except Exception as e:
            print traceback.format_exc(e)
            return None
        finally:
            if '_httpClient' in dir():
                _httpClient.close()

# test demo
if __name__ == '__main__':
    http_cli = HttpClient('apis.baidu.com', 80, 30)
    header = {
        "apikey": "af8a128ea2f8f494cf7ab9456208a762",
         "Content-Type": "application/json"
    }
    res = http_cli.send_request('/txapi/mvtp/meinv?num=10', 'GET', header=header)
    print res