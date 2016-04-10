# -*- coding: utf-8 -*-

import json

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
        try:
            if header is None:
                header = self.header
            if body is None:
                body = {}
            body_json = json.dumps(body)

