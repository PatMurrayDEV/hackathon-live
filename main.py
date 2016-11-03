#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Imports the Flask wrapper, abort function and request context
from flask import Flask, abort, request, render_template

from werkzeug.contrib.cache import SimpleCache

#Create a little persistent cache object, just for example's sake
cache = SimpleCache()

#Import some helper functions
import settings

# Creates an instance of the flask server using *this* module as its unique identifier
app = Flask(__name__, template_folder='views')


#This is a function decorator, it basically is a middleware that attaches the function hello to the flask gateway
@app.route("/")
def home():
	return render_template('index.html')

@app.route("/announcements", methods=['POST', 'GET'])
def webhook_receipt():

	if request.method == 'GET':
		return render_template('announce.json')


	if request.method != 'POST':
		abort(405)

	socketio.emit('message', "WEEE")

	return 'Successful push'


@app.route("/past-webhook")
def past_webhook():
	#This is a really naive implementation of getting and displaying a past webhook's data
	return """
	%s
	"""  % cache.get('webhook_payload')

# Ridiculously simplistic running mechanism
if __name__ == "__main__":
	app.run(host='0.0.0.0', port=settings.PORT, debug=True)
