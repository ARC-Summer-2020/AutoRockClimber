from bottle import run, request, route, abort

# What each header should be on incoming request
headers = {
  'content-type': 'application/json'
}

# Each header to check for incoming request
header = ['content-type']

# Save state of rocks, where each element of the list contains a rock
# Keys of each element: placement, type
rocks = []

@route('/decisionEngine/shortestPath', method='POST')
def find_path():
    """Gets the request to find the shortest path on the given path.
    Example request: 
    {
        "rocks": [
            {
                "placement": "(0, 1)",
                "type": "jug"
            },
            {
                "placement": "(0.3, 1)",
                "type": "crimp"
            },
            {
                "placement": "(.1, .1)",
                "type": "foothold"
            }
        ]
    }

    Returns:
        Successful json request message with the rocks places and types provided.
    """
    for head in header:
        if request.get_header(head) != headers.get(head):
            abort(406, 'Incorrect headers')
    rocks = request.json.get('rocks')
    if not rocks:
        abort(400, 'Bad request')
    for rock in rocks:
        if not (rock.get('placement') or rock.get('type')):
            abort(400, 'Bad request')
    userHeightError = "Bad user height number input"
    wallHeightError = "Bad wall height number input"
    userHeightRequest = var_request('userHeight', userHeightError, request)
    wallHeightRequest = var_request('wallHeight', userHeightRequest, request)

    params = {}
    add_KV_pair(params, 'rocks', rocks)
    add_KV_pair(params, 'userHeight', userHeightRequest)
    add_KV_pair(params, 'wallHeight', wallHeightRequest)

    return {'response': params, 'Message': 'Request successfully recieved, congratz on your rockz'}
    
def add_KV_pair(dict, key, value):
    if value is not '':
        dict[key] = value

def var_request(param, errorMsg, request):
    varRequest = request.json.get(param)
    if varRequest is None:
        varRequest = '' 
    elif not isinstance(varRequest, (int, float)):
        abort(400, errorMsg)
    return varRequest

run(host='localhost', port=8001, reloader=True, debug=True)