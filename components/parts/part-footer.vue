<template>
	<footer class="footer">
		<div class="footer__wrap wrap">
			<div class="footer__top flex flex_vertical flex_justify">
				<part-footer-logo />
				<part-footer-apps />
			</div>
			<div class="footer__bottom flex flex_vertical flex_justify">
				<part-footer-logo class="small-tablet-hidden" />
				<part-footer-links />
				<part-footer-apps class="small-tablet-hidden" />
			</div>
		</div>
	</footer>
</template>

<style lang="scss">
.footer {
	width: 100%;

	.small-tablet-hidden {
		@include small-tablet {
			display: none;
		}
	}

	.small-tablet-visible {
		display: none;
		@include small-tablet {
			display: block;
		}
	}

	@include small-tablet {
		margin-bottom: 48rem;
	}

	&__top {
		display: none;
		padding: 0 0 20rem 0;

		@include small-tablet {
			display: flex;
			justify-content: space-between;
			flex-wrap: nowrap;
		}
	}

	&__logo {
		flex: 0 0 auto;
		width: 132rem;

		@include large-mobile {
			width: 120rem;
		}
	}

	&__nav {
		list-style: none;
		flex: 1 1 auto;
		margin-right: -25rem;

		&-item {
			margin: 5rem 25rem;
		}

		@include large-desktop {
			margin-right: -15rem;

			&-item {
				margin: 5rem 15rem;
			}
		}

		@include large-tablet {
			display: none;
		}
	}

	&__bottom {
		padding: 20rem 0;
		border-top: 1px solid rgba(195, 200, 203, 0.6);
		@include small-tablet {
			justify-content: center;
		}
	}

	&__list {
		margin-top: -5rem;
		margin-bottom: -5rem;

		@include large-mobile {
			justify-content: space-between;
			width: 100%;
		}
	}

	&__item {
		margin-top: 5rem;
		margin-bottom: 5rem;

		&:not(:first-child) {
			margin-left: 50rem;
		}

		// @include large-tablet {
		// &:last-child {
		// 	position: absolute;
		// 	right: var(--wrapper-offset);
		// 	top: 28rem;
		// 	margin: 0;
		// }
		// }

		@include small-tablet {
			&:not(:first-child) {
				margin-left: 30rem;
			}
		}

		@include large-mobile {
			margin-left: 0 !important;

			// &:last-child {
			// 	top: 4rem;
			// }
		}
	}

	.mobile-visible {
		display: none;
	}

	&__copyright {
		color: rgba(6, 36, 57, 0.5) !important;
	}

	&__link {
			color: #062439;
		text-decoration: underline;
		transition: ease .2s;
		&_button {
			cursor: pointer;
		}
		&:hover {
			color: $blue;
		}
	}

	&__dev {
		display: inline-flex;
		align-items: center;
		font-weight: 600;

		&-heart {
			width: 14rem;
			height: 13rem;
			fill: $red;
			margin: 0 4rem;
			margin-top: -1px;
		}

		@include large-mobile {
			&-heart {
				width: 12rem;
				height: 11rem;
				margin: 0 2px;
			}
		}
	}

	&__social {
		@include large-mobile {
			display: none;
		}
	}

	@include large-mobile {
		.mobile-visible {
			display: block;
		}

		.mobile-hidden {
			display: none;
		}
	}
	&__apps {
		align-items: center;
		display: flex;
		&_item {
			cursor: pointer;
			padding: 0 10rem;
			&:last-child {
				padding-right: 0;
			}
		}
	}
}</style>
