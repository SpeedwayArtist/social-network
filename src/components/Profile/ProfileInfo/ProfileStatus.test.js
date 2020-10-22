import React from "react";
import ProfileStatus from "./ProfileStatus";
import {create} from "react-test-renderer";

describe("Profile status", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={'test status'} />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('test status');
    });

    test("after creation <span> with status should be displayed", () => {
        const component = create(<ProfileStatus status={'test status'} />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={'test status'} />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });

    test("<span> should contains correct status", () => {
        const component = create(<ProfileStatus status={'test status'} />);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[0]).toBe('test status');
    });

    test("<input> should be visible in edit mode instead of <span>", () => {
        const component = create(<ProfileStatus status={'test status'} />);
        const root = component.root;
        const span = root.findByType('span');
        span.props.onDoubleClick();
        const input = root.findByType('input');
        expect(input.props.value).toBe('test status');
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status={'test status'} updateUserStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});