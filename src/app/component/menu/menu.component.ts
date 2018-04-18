import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
})
export class MenuComponent {
    respostaAuth;

    isAuthenticated: boolean = false;
   userId;
   windowHandle;
   ourcode;
   accesstoken;
  constructor(private http: Http, private router: Router) { }
 
login(usercreds){
  var headers = new Headers();
        var creds = 'name=' + usercreds.username + '&password=' + usercreds.password;
        
        headers.append('Content-Type', 'application/X-www-form-urlencoded');
        return new Promise((resolve) => {
        this.http.post('http://localhost:3333/authenticate', creds, {headers: headers}).subscribe((data) => {
            if(data.json().success) {
                this.userId = data.json().userId;      
                this.isAuthenticated = true;}
                resolve(this.isAuthenticated);
            }
        )
        
        })
}

addQueryString(uri, parameters) {
    var delimiter = (uri.indexOf('?') == -1) ? '?' : '&';
    for (var parameterName in parameters) {
        var parameterValue = parameters[parameterName];
        uri += delimiter + encodeURIComponent(parameterName) + '=' + encodeURIComponent(parameterValue);
        delimiter = '&';
    }
    console.log(uri);
    return uri;
}
 
authorizeuser() {

    var uri = this.addQueryString("http://localhost:63440/OAuth/Authorize", {
        'client_id': '7890ab',
        'redirect_uri': "http://localhost:4200/api",
        'state': 'my-nonce',
        'scope': 'bio notes',
        'response_type': 'code',
    });

  this.windowHandle = window.open(uri, 'Authorize', 'width=640,height=480');
  var href;
//   setTimeout(() => {
//     href = this.windowHandle.location.href;
    

//     this.windowHandle.close();
//     console.log(href);
//     var extractedcode = href.split('=');
//     this.ourcode = extractedcode[1];
//     //console.log(extractedcode);
//     if(this.ourcode)
//     this.getAccessToken();
//     else
//     console.log('Access denied. Try again');
//   },5000);
}

getFragment() {
    if (window.location.hash.indexOf("#") === 0) {
        return this.parseQueryString(window.location.hash.substr(1));
    } else {
        return {};
    }
}

parseQueryString(queryString) {
    var data = {},
        pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

    if (queryString === null) {
        return data;
    }

    pairs = queryString.split("&");

    for (var i = 0; i < pairs.length; i++) {
        pair = pairs[i];
        separatorIndex = pair.indexOf("=");

        if (separatorIndex === -1) {
            escapedKey = pair;
            escapedValue = null;
        } else {
            escapedKey = pair.substr(0, separatorIndex);
            escapedValue = pair.substr(separatorIndex + 1);
        }

        key = decodeURIComponent(escapedKey);
        value = decodeURIComponent(escapedValue);

        data[key] = value;
    }

    return data;
}

addbook(newbook) {
  var headers = new Headers();
  
  headers.set('Authorization', 'Bearer '+ this.accesstoken);
  headers.set('Content-Type', 'application/X-www-form-urlencoded');
  
  var book = 'name=' + newbook.name + '&type=' + newbook.type + '&quantity=' + newbook.quantity;
  return new Promise((resolve) => {
        this.http.post('http://localhost:3333/addbook', book, { headers: headers } ).subscribe((data) => {
            
                console.log(data);    
                
                resolve(data);
            
        })
        
        })
  
}
 
getAccessToken() {
    let client_id = '7890ab';
    let client_secret= 'tUskPBzu64';
    var basicheader = btoa(client_id + ':' + client_secret);
    
    var headers = new Headers();
    
    headers.append('Authorization', 'Basic '+ basicheader);
    headers.append('Content-Type', 'application/X-www-form-urlencoded');
    
    var tokendata = 'code=' + this.ourcode + '&grant_type=authorization_code&redirect_uri=http://localhost:4200/Alunos';
    
    this.http.post('http://localhost:3333/oauth2/token', tokendata, {headers: headers}).subscribe((data) => {
        
        
        this.accesstoken = data.json().access_token;
        console.log(this.accesstoken);
        this.router.navigate(['/books']);
        });
    }
}