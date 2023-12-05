import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  test('renders social media links', () => {
    render(<Footer />);

    const instagramLink = screen.getByTestId('instagram-link');
    const facebookLink = screen.getByTestId('facebook-link');
    const googleLink = screen.getByTestId('google-link');

    expect(instagramLink).toBeInTheDocument();
    expect(facebookLink).toBeInTheDocument();
    expect(googleLink).toBeInTheDocument();
  });

//   test('renders copyright information with author link', () => {
//     render(<Footer />);

//     const copyrightText = screen.getByText(/© 2024 Copyright/i);
//     const authorLink = screen.getByTestId('author-link');

//     expect(copyrightText).toBeInTheDocument();
//     expect(authorLink).toBeInTheDocument();
//   });
});