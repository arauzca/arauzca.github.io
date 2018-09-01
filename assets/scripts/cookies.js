/* JavaScript file to manage cookies */
const set_cookie = (cookie_name, cookie_value, expire_days=365) => {
   let d = new Date();
   d.setDate(d.getTime() + (expire_days * 86400000));
   let expires = "expires=" + d.toUTCString();
   document.cookie = cookie_name + "=" + cookie_value + ";" + expires + ";path=/";
 };

const get_cookie = (cookie_name) => {
     var name = cookie_name + "=";
     var ca = document.cookie.split(';');
     for(var i = 0; i < ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0) == ' ') {
             c = c.substring(1);
         }
         if (c.indexOf(name) == 0) {
             return c.substring(name.length, c.length);
         }
     }
     return "";
 }
