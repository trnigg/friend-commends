import React from "react";
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
  Icon,
  Message,
  Form,
  TextArea,
} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import FriendSearchSelection from "./friendDropdown";
import { MUTATION_SHAREMOVIE, MUTATION_SHARETV } from "../utils/selfMutations";

function ShareModal({...props}) {
   //console.log("props:",props)
   const {
        tmdbID,
        type,
        overview,
        poster_path,
        AU_platforms: platforms,
      } = props;
      let title = props.original_title || props.original_name;
      let date = props.release_date || props.first_air_date;

  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [open, setOpen] = useState(false);
 
  const [shareWith, setShareWith] = useState("");
  const [message, setMessage] = useState("");
  const [shareMovie, { error: movieErr }] = useMutation(MUTATION_SHAREMOVIE);
  const [shareTV, { error: tvErr }] = useMutation(MUTATION_SHARETV);

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
    //console.log("target.value:", e.target.value);
  };

  const handleShareClick = async () => {
    if (shareWith.value && props) {
      try {
        console.log("props:", props);
        console.log("shareWith.value:", shareWith.value);
        if (type === "Movie") {
          const shareMovieObject = {
            sharedTo: shareWith.value,
            tmdbID: tmdbID,
            type: type,
            original_title: title,
            overview: overview,
            poster_path: poster_path,
            AU_platforms: platforms,
            release_date: date,
            shareMessage: message,
          };
          await shareMovie({
            variables: { shareMovieInput: { ...shareMovieObject } },
          });
          
          setErrorMsg(false);
          setSuccessMsg(true);
        } else if (type === "TV") {
          const shareTVObject = {
            sharedTo: shareWith.value,
            tmdbID: tmdbID,
            type: type,
            original_name: title,
            overview: overview,
            poster_path: poster_path,
            AU_platforms: platforms,
            first_air_date: date,
            shareMessage: "test",
          };
          await shareTV({
            variables: { shareTvInput2: { ...shareTVObject } },
          });
          setErrorMsg(false);
          setSuccessMsg(true);
        } else {
          setErrorMsg(true);
        }
      } catch (err) {
        console.log(err);
        setErrorMsg(true);
      }
    }
  };

  return (
    <Modal
      closeIcon
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button primary floated="right">
          Share
          <Icon name="right chevron" />
        </Button>
      }
    >
      <ModalHeader>Share with your friend!</ModalHeader>
      <Message
        onDismiss={() => {
          setErrorMsg(false);
        }}
        hidden={!errorMsg}
        color="red"
      >
        Unable to share with your friend at the moment. Please try again later.
      </Message>
      <Message
        onDismiss={() => {
          setSuccessMsg(false);
        }}
        hidden={!successMsg}
        color="green"
      >
        Shared successfully!
      </Message>
      <ModalContent image>
        <ModalDescription>
          <Header>Who do you wish to share with?</Header>
          <FriendSearchSelection
            shareWith={shareWith}
            setShareWith={setShareWith}
          />
          <Form>
            <TextArea
              placeholder="Send them a short message."
              onChange={handleMessageInput}
            />
          </Form>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleShareClick} positive>
          Share
        </Button>
      </ModalActions>
    </Modal>
  );
}

export default ShareModal;