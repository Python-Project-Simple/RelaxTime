# -*- coding: utf-8 -*-
from django.views.generic import View,TemplateView
from service import niceview_svr

class PictureView(TemplateView):

    template_name = 'index.html'
    # template_name = 'test.html'

    def get_context_data(self, **kwargs):
        context = super(TemplateView, self).get_context_data(**kwargs)
        res = niceview_svr()
        context['pic_name'] = res['picList']
        return context

