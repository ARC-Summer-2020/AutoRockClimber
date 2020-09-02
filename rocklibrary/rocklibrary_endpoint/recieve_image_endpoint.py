from bottle import run, request, route, abort
import os
from PIL import Image
import tempfile

# What each header should be on incoming request
headers = {
  'content-type': 'multipart/form-data'
}

# Each header to check for incoming request
header = ['content-type']

# Save state of a successful image upload and color request
# Keys: imagePath, color
imageUpload = {}

colors = ['green', 'blue', 'yellow', 'red', 'purple', 'pink', 'black', 'brown', 'dark red', 'dark yellow', 'dark blue',
            'light red', 'light green', 'grey', 'orange', 'white']
@route('/rockLibrary/imageupload', method='POST')
def getImageUploadAndColor():
    """Recieves request of image to be uploaded along with the
    respective color to be found on the image

    Example request: 
        {
            "image": <image_file>,
            "color": pink
        }

    Returns:
        Successful json request message with the rocks places and types provided.
    """
    for head in header:
        print(request.get_header(head))
        if headers.get(head) not in request.get_header(head):
            abort(406, 'Incorrect headers')
    
    
    colorRequest = request.forms.get('color')
    imageRequest = request.files.get('image')
    if not (colorRequest and imageRequest):
        abort(400, 'Bad request')

    if not colorRequest in colors:
        abort(407, 'Bad color input')
    
    userHeightError = "Bad user height number input"
    wallHeightError = "Bad wall height number input"
    
    userHeightRequest = var_request('userHeight', userHeightError, request)
    wallHeightRequest = var_request('wallHeight', wallHeightError, request)

    imageName = imageRequest.filename.split('.')
    if len(imageName) > 2 or imageName[len(imageName)-1] not in ('jpeg', 'jpg', 'png'):
        abort(400, 'Bad Request on image input')

    tempdirectory = tempfile.gettempdir()
    if not os.path.exists(tempdirectory):
        abort(512, 'server fault')
    
    file_path = r'{path}/{file}'.format(path=tempdirectory, file=imageRequest.filename)
    imageRequest.save(file_path, overwrite=True)
    im = Image.open(file_path)
    im.show()

    params = {}
    add_KV_pair(params, 'color', colorRequest)
    # Object of type FileUpload is not JSON serializable
    # add_KV_pair(endPts, 'image', imageRequest) 
    add_KV_pair(params, 'userHeight', userHeightRequest)
    add_KV_pair(params, 'wallHeight', wallHeightRequest)

    imageUpload = {'imagePath': file_path, 'color': colorRequest}

    return {'response': params, 'Message': 'Request successfully recieved, congratz on your rockz'}

def add_KV_pair(params, key, value):
    if value != '':
        params[key] = value

def var_request(param, errorMsg, request):
    varRequest = request.forms.get(param)
    if varRequest is None:
        varRequest = ''
    else:
        try:
            testRequest = float(varRequest)
        except:
            abort(400, errorMsg)
    return varRequest

run(host='localhost', port=8002, reloader=True, debug=True)