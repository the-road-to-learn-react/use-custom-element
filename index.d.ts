///// <reference path="react" />

export default function useCustomElement<P, R extends HTMLElement>(
    props: P,
    customMapping: Partial<{ [key in P]: string }> = {}
): [Partial<{ [key in P]: string }>, React.RefObject<R>]