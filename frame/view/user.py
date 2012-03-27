#-*- encoding:utf-8 -*-
from django.shortcuts import render_to_response
from django.core.context_processors import csrf
from django.template import RequestContext
import json, logging

logger = logging.getLogger(__name__)

def list(request):
    from django.contrib.auth.models import User

    context = {'msg': Message()}
    context['users'] = model2json(User.objects.all())

    return render_to_response('user/list.html', context)

def edit(request):
    from django.contrib.auth.models import User

    context = {'msg': Message()}
    in_username = request.REQUEST.get('username')
    
    try:
        user = User.objects.get(username=in_username)
    except User.DoesNotExist:
        context['msg'].status, context['msg'].title = False, u'用户 %s 不存在！' % in_username
        return render_to_response('user/edit.html', context, context_instance=RequestContext(request))

    if request.REQUEST.get('action', '') == 'save':
        user.last_name = request.REQUEST.get('last_name')
        user.first_name = request.REQUEST.get('first_name')
        user.email = request.REQUEST.get('email')
        user.save()
        context['msg'].title = '用户信息修改完成！'
    
    context['user'] = user
    return render_to_response('user/edit.html', context, context_instance=RequestContext(request))

def add(request):
    from django.contrib.auth.models import User

    context = {'msg': Message()}

    if request.REQUEST.get('action', '') == 'save':
        in_username = request.REQUEST.get('username', '')
        try:
            user = User.objects.get(username=in_username)
            context['msg'].status = False
            context['msg'].title = '用户已存在！'
        except User.DoesNotExist:
            user = User(
                       username=request.REQUEST.get('username'), 
                       password=request.REQUEST.get('username'),
                       last_name = request.REQUEST.get('last_name', ''),
                       first_name = request.REQUEST.get('first_name', ''),
                       email = request.REQUEST.get('email', ''),
                   )
            user.save()
            context['msg'].status = True
            context['msg'].title = '新增了一个用户！'
    
    return render_to_response('user/add.html', context, context_instance=RequestContext(request))

def model2json(model):
    import json, datetime
    from django.db.models.query import QuerySet
    def handler(obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
    return json.dumps( (lambda x: [m.__dict__ for m in x] if isinstance(x, QuerySet) else x.__dict__)(model), default=handler)

class Message:
    def __init__(self, status=True, title='欢迎使用！'):
        self.status = status
        self.title = title
    def __str__(self):
        return json.dumps({'status': self.status, 'title': self.title})
