import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./mailList.css";

const PUBLIC_KEY = process.env.REACT_APP_YOUR_PUBLIC_KEY;

const MailList = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const mess = document.getElementById("mess");
    try {
      emailjs
        .sendForm(
          "service_ttj46bb",
          "template_63gzse7",
          form.current,
          PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
            mess.innerHTML = "Your request has not been registered";
            mess.classList.add("error");
          }
        );

      mess.innerHTML = "Your request has been registered !";
      mess.classList.add("sucess");
    } catch (error) {
      mess.innerHTML = "Your request has not been registered";
      mess.classList.add("error");
    }

    e.target.reset();
  };

  return (
    <div className="mail">
      <div className="mailContainer">
        <h1 className="mailTitle">SleepWell everytime, everywhere !</h1>
        <span className="mailDesc">
          Sign up and we'll contact you soon 
        </span>
        <div className="inputContainer">
          <form ref={form} onSubmit={sendEmail}>
            <input type="text" placeholder="Your email" name="user_email" />
            <button type="submit" value="Send">
              Suscribe
            </button>
          </form>
          <div id="mess"></div>
        </div>
      </div>
    </div>
  );
};

export default MailList;
