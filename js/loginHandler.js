/********************************
 *                              *
 *      SELECT ADD OPTION       *
 *                              *
 ********************************/

 /* mapping user select and session select object
    into respective variable */
const usrSelect = document.getElementById("selectUser");
const sesSelect = document.getElementById("selectSession");

 /* user select option listing */
// mapping user name from lightdm user list collection
const usrs = lightdm.users.map(u => u.name);

// adding each user into select option
usrs.forEach(opt => {
    usrSelect.add(
        new Option(opt)
    )
});

/* session select option listing */
// idk, just want to add session array into variable for easy calling
const sess = lightdm.sessions;

// add each session name into select option
sess.forEach(opt => {
    sesSelect.add(
        new Option(opt.name)
    )
});

// display welcome text to match first selected user
document.getElementById("welcome").innerHTML = `Welcome Back, ${usrSelect.value}!`


/****************************************
 *                                      * 
 *      GREETER CALLBACK FUNCTION       *
 *                                      *
 ****************************************/ 

 // showing error message, that's it! just this
 // wanna add more type like warning and info
 window.show_message = (text,type) => {

     // check if text isn't null, if yes then return nothing, quitting this function
     if(!text.length) return;

     // get status-text element and add it into variable
     let messages = document.getElementById("status-text");
     messages.style.visibility = "visible";
     
     // if status type is error, then return text with red colored font
    if(type == 'error'){
        messages.style.color = "red" 
        text = `${text}`;
    }
    
     // else just return itself + text, will improve later
     messages.innerHTML = `${messages.innerHTML}${text}`;
 }

 // function to execute if authentication is completed
 window.authentication_complete = () => {
     
    // check if user is authenticated
     if(lightdm.is_authenticated) {
         // if true, then start session selected by user
         document.documentElement.addEventListener('transitionend', lightdm.start_session(sess[sesSelect.index]));
     } else {
         // if false then return error mesage
         show_message("Authentication Failed", "error");
         setTimeout(start_authentication,3000);
     }
 }

 // idk what this thing do, will delete later if this has no real function
 function autologin_timer_expired(username) {
     /* yea */
 }

 /***************************************
  *                                     *
  *         LOCAL THEME FUNCTION        *
  *                                     *
  ***************************************/

  /*  clear error/status message */
  function clear_messages() {
      let messages = document.getElementById("status-text");
      messages.innerHTML = "";
      messages.style.visibility = "hidden";
  };

  // starting authentication or user
  window.start_authentication = () => {
      // first clear error/status message
      clear_messages();

      // then authenticate based on username selected by user
      lightdm.authenticate(usrSelect.value);
  };

  // password input handling
  window.handle_input = () => {
      // check if authentication for user is started
      if(lightdm.authentication_user) {
            // if yes then check input password whether it's correct or not
            let entry = document.getElementById("inputPassword");
            lightdm.respond(entry.value);
      } else {
            // if no then show error message
            show_message("No authentication running!", "error");
      }
  }

/********************************
 *                              *
 *    AUTHENTICATION PROCESS    *
 *                              *
 ********************************/
  // just leave this, this will start auth for
  // first user displayed in select user
  // right after greeter loaded
    start_authentication();

/******************************** 
 *                              * 
 *     BUTTON EVENT FUNCTION    *
 *                              *
 ********************************/


// check if user select is clicked
usrSelect.onclick = () => {
    // rerun authentication process and change welcome text
    // to match selected username
    document.getElementById("welcome").innerHTML = `Welcome Back, ${usrSelect.value}!`;
    start_authentication();
}

//  these 3 button below is just power button  
//  no need to explain further                 
const restartBut = document.getElementById("buttonRestart");
restartBut.onclick = () => {
    if(lightdm.can_restart) {
        lightdm.restart();
    } else {
        document.getElementById("status-text").innerHTML = "Cannot Restart, I don't have the permission";
    }
}

const hibernateBut = document.getElementById("buttonHibernate");
hibernateBut.onclick = () => {
    if(lightdm.can_hibernate) {
        lightdm.hibernate();
    } else {
        document.getElementById("status-text").innerHTML = "Cannot Hibernate, I don't have the permission";
    }
}

const shutdownBut = document.getElementById("buttonShutdown");
shutdownBut.onclick = () => {
    if(lightdm.can_shutdown) {
        lightdm.shutdown();
    } else {
        document.getElementById("status-text").innerHTML = "Cannot Shutdown, I don't have the permission";
    }
}

// login button click event
const logBut = document.getElementById("loginButton");
logBut.onclick = () => {
    // start password input handling process
    handle_input();
}



/**
 * FLOW => select user -> start auth -> input password -> lightdm.respond
 */