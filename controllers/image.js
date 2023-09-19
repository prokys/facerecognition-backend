const handleImage = (req, res, db) =>{  
    const {id} = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
     res.json(entries[0].entries);
     })
     .catch(err => res.status(400).json('unable to get entries'))
}

const handleApiCall = (req, res) => {
    
  const returnClarifaiRequestOptions = (imageUrl) =>{
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = '62ed9203560d4d62ae37a1f93f9937b8';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = '6zsnxmq8z8rc';       
  const APP_ID = 'my-first-application-hst4bl';
  // Change these to whatever model and image URL you want to use 
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});
const requestOptions = {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
  },
  body: raw
};

return requestOptions;
}

fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOptions(req.body.input))
    .then(response => {
        if(response.statusText === 'Bad Request'){
            res.status(400).json('Wrong url')
        }else{
            return response.json()
        }

    })
    .then(data => res.json(data))
    .catch(error => console.log('error', error))
}

module.exports = {
    handleImage,
    handleApiCall
}