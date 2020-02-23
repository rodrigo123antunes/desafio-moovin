import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ReactPaginate from 'react-paginate';
import './App.scss'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const App = () => {
	const [posts, setPosts] = useState([]);
	const [count, setCount] = useState(0);
	const [currentPage, setCurrentPage] = useState('1');
	const [postsPerPage] = useState(20);

	useEffect(() => {
		async function loadPosts() {
			const response = await axios.get(`https://gorest.co.in/public-api/posts?_format=json&access-token=M2hmOyEbsa99xxhSpDTaE6PcQZhUFfQrKBCH&page=${currentPage.toString()}`);

			setPosts(response.data.result);
			setCount(response.data._meta.totalCount);
		}

		loadPosts();
	}, [currentPage]);

	return (
		<>
			<Header />
			<div className='content'>
				<h5 className='color title'>Últimas postagens</h5>
				<table className='rTable color bold'>
					<thead className='tHead'>
						<th className='width30'>Título</th>
						<th className='width60'>Conteúdo</th>
						<th className='width10'>Data de publicação</th>
					</thead>
					<tbody>
						{
							posts.map((post, key) => {
								const {title, body, id} = post;
								return (
									<tr key={key}>
										<td>{title}</td>
										<td>{body}</td>
										<td>{id}</td>
									</tr>
								);
							})
						}
					</tbody>
				</table>
				<div className='row'>
					<div className='col-md-6'>
						<p className='text-secondary font12'>{`Exibindo ${postsPerPage} itens por página`}</p>
					</div>
					<div className='col-md-6 d-flex justify-content-end'>
						<ReactPaginate
							previousClassName={'action-btn'}
							nextClassName={'action-btn'}
							previousLabel={'<'}
							nextLabel={'>'}
							breakLabel={'...'}
							breakClassName={'page-item'}
							pageCount={count}
							marginPagesDisplayed={2}
							pageRangeDisplayed={5}
							onPageChange={(data)  => {
								const selected = data.selected + 1;
								setCurrentPage(selected.toString());
							}}
							containerClassName={'pagination'}
							pageClassName={'page-item'}
							activeClassName={'active'}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default App
