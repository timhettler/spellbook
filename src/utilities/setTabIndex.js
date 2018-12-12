import ScrollFix from './ScrollFix';

export default function setTabIndex(node) {
  let scrollable =
    node.scrollWidth > node.clientWidth ||
    node.scrollHeight > node.clientHeight;

  if (scrollable) {
    new ScrollFix(node);
  }

  this.setState({
    canScroll: scrollable,
  });
}
