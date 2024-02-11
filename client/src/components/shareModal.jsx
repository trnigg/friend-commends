import React from 'react';
import {
	ModalHeader,
	ModalDescription,
	ModalContent,
	ModalActions,
	Button,
	Header,
	Modal,
	Icon,
	Message,
	Form,
	TextArea,
	Popup,
} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import FriendSearchSelection from './friendDropdown';
import { MUTATION_SHAREMOVIE, MUTATION_SHARETV } from '../utils/selfMutations';

function ShareModal({ ...props }) {
	//  console.log("props:",props)
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

	const [isHovered, setIsHovered] = useState(false); // work around for the hover effect with popup

	const [shareWith, setShareWith] = useState('');
	const [message, setMessage] = useState('');
	const [shareMovie, { error: movieErr }] = useMutation(MUTATION_SHAREMOVIE);
	const [shareTV, { error: tvErr }] = useMutation(MUTATION_SHARETV);

	const handleMessageInput = (e) => {
		setMessage(e.target.value);
		//console.log("target.value:", e.target.value);
	};

	const handleShareClick = async () => {
		if (shareWith.value && props) {
			try {
				console.log('props:', props);
				console.log('shareWith.value:', shareWith.value);
				if (type === 'Movie') {
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
					console.log(shareMovieObject);
					await shareMovie({
						variables: { shareMovieInput: { ...shareMovieObject } },
					});

					setErrorMsg(false);
					setSuccessMsg(true);
				} else if (type === 'TV') {
					const shareTVObject = {
						sharedTo: shareWith.value,
						tmdbID: tmdbID,
						type: type,
						original_name: title,
						overview: overview,
						poster_path: poster_path,
						AU_platforms: platforms,
						first_air_date: date,
						shareMessage: 'test',
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
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Popup
				content="Share with a friend"
				open={isHovered}
				trigger={
					<Modal
						closeIcon
						onClose={() => setOpen(false)}
						onOpen={() => setOpen(true)}
						open={open}
						trigger={<Button basic primary circular icon="share" size="big" />}
					>
						<ModalHeader>Share with your friend!</ModalHeader>
						<Message
							onDismiss={() => {
								setErrorMsg(false);
							}}
							hidden={!errorMsg}
							color="red"
						>
							Unable to share with your friend at the moment. Please try again
							later.
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
								<label>Select a friend:</label>
								<FriendSearchSelection
									shareWith={shareWith}
									setShareWith={setShareWith}
								/>
								<label>Message:</label>
								<Form>
									<TextArea
										placeholder="Send them a short message."
										onChange={handleMessageInput}
									/>
								</Form>
							</ModalDescription>
						</ModalContent>
						<ModalActions>
							<Button basic onClick={() => setOpen(false)} negative>
								<Icon name="cancel" />
								Cancel
							</Button>
							<Button basic primary onClick={handleShareClick}>
								<Icon name="share" />
								Share
							</Button>
						</ModalActions>
					</Modal>
				}
			/>
		</div>
	);
}

export default ShareModal;
