#-*- encoding:utf-8 -*-
# Create your views here.
from django.shortcuts import render_to_response
from frame.frame_navbar import navbar_data
import json, logging

logger = logging.getLogger(__name__)

def navbar(request):
	return render_to_response('layout_navbar.js', {"navbar_data": json.dumps(navbar_data)})
