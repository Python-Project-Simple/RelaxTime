<<<<<<< HEAD
# -*- coding: utf-8 -*-
from django.views.generic import View,TemplateView
from service import niceview_svr

class PictureView(TemplateView):

    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(TemplateView, self).get_context_data(**kwargs)
        res = niceview_svr()
        context['pic_name'] = res['picUrl']
        return context
=======
# -*- coding: utf-8 -*-
>>>>>>> e5e1a6d921d964986b6bd4b49b687f9b83e7c002
