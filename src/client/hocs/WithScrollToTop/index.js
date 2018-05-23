import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import styles from './styles';
import ArrowUpward from 'material-ui-icons/ArrowUpward';
import WindowScrollService, { SCROLL_EVENT } from '../../services/windowScrollService';


export default function withScrollToTop() {
	return function(WrappedComponent) {
		@withStyles(styles)
		class WithScrollToTop extends React.PureComponent {
			constructor(props) {
				super(props);

				this.state = {
					isButtonShown: false
				};

				WindowScrollService.subscribe(SCROLL_EVENT, this.handleScroll);
			}

			componentWillUnmount() {
				WindowScrollService.unSubscribe(SCROLL_EVENT, this.handleScroll);
			}

			handleScroll = () => {
				const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

				this.setState({
					isButtonShown: scrollTop > 50
				});
			};

			handleScrollToTop = () => {
				WindowScrollService.scrollToTop();
			};

			render() {
				const { classes } = this.props;
				const { isButtonShown } = this.state;

				return (
					<div>
						<WrappedComponent {...this.props} />

						<Button
							className={classNames(
								'mx-1',
								classes.button,
								{
									[classes.buttonVisible]: isButtonShown
								}
							)}
							variant="fab"
							aria-label="edit"
							onClick={this.handleScrollToTop}>
							<ArrowUpward />
						</Button>
					</div>
				);
			}
		}

		return WithScrollToTop;
	};
}
