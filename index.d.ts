///// <reference path="react" />

export default function useCustomElement<R extends HTMLElement, P = {}>(
    props: P,
    customMapping: Partial<{ [key in P]: string }> = {}
): [Partial<{ [key in P]: string }>, React.RefObject<R>]