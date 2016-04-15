# -*- coding: utf-8 -*-

import json
from django.http import HttpResponse
from service import niceview_svr

def byteify(input):
    """
    byteify
    """
    if isinstance(input, dict):
        return {byteify(key): byteify(value) for key, value in input.iteritems()}
    elif isinstance(input, list):
        return [byteify(element) for element in input]
    elif isinstance(input, unicode):
        return input.encode('utf-8')
    else:
        return input

def get_picture(request):

    response = {}
    try:
        if request.method != "GET":
            response["returnCode"] = 405
            response["returnMSG"] = "Method Not Allowed"
        else:
            response["returnCode"] = 200
            response["returnMSG"] = "Success"
            response["returnBody"] = niceview_svr()
    except Exception as e:
        response["returnCode"] = 399
        response["returnMSG"] = str(e)
    return HttpResponse(json.dumps(response))
