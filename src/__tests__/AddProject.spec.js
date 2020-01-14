import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import AddProject from '../components/AddProject';
import '@testing-library/jest-dom/extend-expect';

beforeEach(cleanup);

jest.mock('../context', () => ({
  useProjectsValue: jest.fn(() => ({
    projects: [],
    setProjects: jest.fn()
  }))
}));

jest.mock('../firebase', () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Never mock firebase'))
      }))
    }))
  }
}));

describe('<AddProject />', () => {
  describe('Success', () => {
    it('renders AddProject', () => {
      const { queryByTestId } = render(<AddProject />);

      expect(queryByTestId('add-project')).toBeTruthy();
    });

    it('renders AddProject main', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);

      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();
    });

    it('renders AddProject main on click', () => {
      const { queryByTestId } = render(<AddProject />);

      expect(queryByTestId('add-project')).toBeTruthy();
      fireEvent.click(queryByTestId('add-project-action'));
      expect(queryByTestId('add-project-inner')).toBeTruthy();
    });

    it('renders AddProject main on keyDown', () => {
      const { queryByTestId } = render(<AddProject />);

      expect(queryByTestId('add-project')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-project-action'));
      expect(queryByTestId('add-project-inner')).toBeTruthy();
    });

    it('hides AddProject main on click', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);

      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.click(queryByTestId('add-project-action'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    })

    it('hides AddProject main on keyDown', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);

      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-project-action'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    })

    it('hides AddProject main when click cancel', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);

      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.click(queryByTestId('hide-project-overlay'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('hides AddProject main when cancel using keyDown', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);

      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('hide-project-overlay'));
      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeFalsy();
    });

    it('add project to firebase', () => {
      const { queryByTestId } = render(<AddProject shouldShow />);

      expect(queryByTestId('add-project')).toBeTruthy();
      expect(queryByTestId('add-project-inner')).toBeTruthy();

      fireEvent.change(queryByTestId('project-name'), {
        target: {
          value: 'I am a amazing new project'
        }
      });
      expect(queryByTestId('project-name').value).toBe(
        'I am a amazing new project'
      );

      fireEvent.click(queryByTestId('add-project-submit'));
      //expect(queryByTestId("add-project-inner")).toBeFalsy()
    });
  });
});
