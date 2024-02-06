import { useState } from 'react';
import Login from './login';
import AddUser from './signUp';

function LogNewUser() {
	const [logStatus, setLogStatus] = useState('login');

	const updateStatus = (data) => {
		setLogStatus(data);
	};

	return (
		<div>
			{logStatus === 'login' ? (
				<Login onSubmit={updateStatus} />
			) : (
				<AddUser onSubmit={updateStatus} />
			)}
		</div>
	);
}

export default LogNewUser;
