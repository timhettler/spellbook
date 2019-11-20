import { addScrollFix, removeScrollFix } from './ScrollFix';

export default function setCanScroll(container, child) {
  let scrollable = false;

  if (!child && container) {
    scrollable =
      container.scrollWidth > container.clientWidth ||
      container.scrollHeight > container.clientHeight;
  } else if (child && container) {
    scrollable = container.clientHeight < child.clientHeight;
  }

  if (scrollable) {
    addScrollFix(container);
  } else {
    removeScrollFix(container);
  }

  this.setState({
    canScroll: scrollable,
  });
}
