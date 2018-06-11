import ScrollFix from './ScrollFix';

export default function setTabIndex(node) {
  let scrollable =
    node.scrollWidth > node.clientWidth ||
    node.scrollHeight > node.clientHeight;

  if (scrollable) {
    new ScrollFix(node);
  }

  node.setAttribute('tabindex', scrollable ? '0' : null);
  node.setAttribute('data-can-scroll', scrollable);

  this.setState({
    tabindex: scrollable ? '0' : null,
  });
}
