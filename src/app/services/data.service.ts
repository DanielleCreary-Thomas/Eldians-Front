import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export  class DataService {
dailyFileContents:any[] = [];

gamesData:any = null;
usersData:any = null;
marketsData:any = null;

blank = " "
zero = "0"

loggedInUser:any;
constructor(private _snackBar: MatSnackBar) { }

encodeUsername(username){
  var block:string = ""
  if(username.length > 0 && username.length < 15){
    block += username.concat(this.blank.repeat(15-username.length))
  }else if (username.length == 15){
    block = username
  }return block

}

encodeAmount(number){
  var block:string=""
  if(number.toLocaleString().length < 9){
    block += (this.zero.repeat(9-number.toLocaleString().length).concat(number.toLocaleString()))
  }else if (number.toLocaleString().length == 9){
    block = number.toLocaleString()
  }return block
}

encodeDiscount(number){
  var block:string=""
  if(number.toLocaleString().length < 5){
    block += this.zero.repeat(5-number.toLocaleString().length).concat(number.toLocaleString())
  }else if (number.toLocaleString().length == 5){
    block = number.toLocaleString()
  }return block
}
encodePrice(number){
  var block:string=""
  if(number.toLocaleString().length < 6){
    block += this.zero.repeat(6-number.toLocaleString().length).concat(number.toLocaleString())
  }else if (number.toLocaleString().length == 6){
    block = number.toLocaleString()
  }return block
}

encodeGamename(name){
  var block:string=""
  if(name.length < 25){
    block += name.concat(this.blank.repeat(25-name.length))
  }else if (name.length == 25){
    block = name
  }return block
}

getGivenUser(username){
  for(var user of this.usersData){
    if(user['username'] === username){
      return user
    }
  }
  return null;
}
getUser(){
  for(var user of this.usersData){
    if(user['username'] === this.loggedInUser){
      return user
    }
  }
  return null;

}

getSellers(){
  var sellers = Object.getOwnPropertyNames( this.marketsData['gamesOnSale'])
  return sellers
}

getGamesForSeller(seller){
  var gameIds = this.marketsData['gamesOnSale'][seller]
  var games = this.getGamesFromIds(gameIds);
  return games
}


isUserAdmin(){
  return this.getUser()['type'] ==="AA";
}

isUserBuyStandard(){
  //if user is full standard or buystandard return true else false
  return this.getUser()['type'] ==="BS" || this.getUser()['type'] ==="FS" || this.getUser()['type'] ==="AA";
}

isUserSellStandard(){
  //if user is full standard or sellstandard return true else false
  return this.getUser()['type'] ==="SS" || this.getUser()['type'] ==="FS" || this.getUser()['type'] ==="AA";
}

authenticateUser(username){
  var user = this.getGivenUser(username);
  if(user === null){
    return false;
  }else{return true;}
   
  // return user && user['password'] === password;
 
}

getFileContentsAsString(){
  var strung = '';
  for(var trans of this.dailyFileContents){
    strung+=trans+"\n";
  }
  return strung;
}

getInventory(){
  var games = [];
  for(var id of this.getUser()['inventory']){
    for(var game of this.gamesData){
      if(game['uniqueID'] == id){
          games.push(game)
    }
  }
}
  return games

}

getInventoryForUsername(username){
  var user = this.getGivenUser(username);
  var games = [];
  for(var id of user['inventory']){
    for(var game of this.gamesData){
      if(game['uniqueID'] == id){
          games.push(game)
    }
  }
}
  return games

}

getGamesFromIds(gameIds){
  if(gameIds !== null && gameIds != undefined){
    var games = [];
    for(var id of gameIds){
      for(var game of this.gamesData){
        if(game['uniqueID'] == id){
            games.push(game)
      }
    }
  }
    return games
  }
  return null;
  

}

showMessage(message: string) {
  this._snackBar.open(message, 'Close', {
    duration: 5000,
  });


}
}
