export { createElement };

function createElement(tag: any, 
					   props: Object, 
					   ...children : Object[]
					   ) : HTMLElement 
{

	if (typeof tag === "function") {
		return Object.assign(
			new tag(), { props: props || {}}).getContent();
	}

	const elem = Object.assign(
		document.createElement(tag), props || {});
	
	children.forEach(
		child => Array.isArray(child) 
			? child.forEach(c => addChild(elem, c)) 
			: addChild(elem, child));
	
	return elem;

	/**
	 * addChild
	 * @param elem 
	 * @param child 
	 */
	function addChild(elem: HTMLElement, 
					  child: any) 
	{
		elem.appendChild(
			child instanceof Node 
				? child 
				: document.createTextNode(child.toString()));
	}

}

declare global {
	namespace JSX {
  		interface ElementAttributesProperty { props; }
	}
}