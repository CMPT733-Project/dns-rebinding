from flask import (
    Blueprint, Flask, redirect, render_template, request, url_for, current_app as app, json
)
import flask


bp = Blueprint('iot', __name__)


@bp.route('/password', methods=('GET',))
def password():
    data = {
        'password': app.password
    }
    return app.response_class(
        response=json.dumps(data),
        mimetype='application/json; charset=utf-8'
    )


@bp.route('/', methods=('GET',))
def index():
    return render_template('index.html')


@bp.route('/change', methods=('GET',))
def change():
    return render_template('change.html')


@bp.route('/state', methods=('GET',))
def get_state():
    data = {
        'state': app.state
    }
    response = app.response_class(
        response=json.dumps(data),
        mimetype='application/json; charset=utf-8'
    )
    return response

@bp.route('/state', methods=('POST',))
def set_state():
    l_password = request.args.get('password', None)
    if l_password != app.password:
        return app.response_class(
            response='wrong password',
            status=401
        )
    state = request.args.get('value', None)
    if not state:
        return app.response_class(
            response='not value',
            status=400,
            mimetype='text/plain'
        )
    app.state = state
    data = {'state': state}
    return app.response_class(
        response=json.dumps(data),
        mimetype='application/json; charset=utf-8'
    )

