import React from 'react';

/**
 * Reusable FAQ Accordion for static JSX pages.
 * Consistent with the Blog's Markdown FAQ style.
 */
const BlogFAQ = ({ question, children, defaultOpen = false }) => {
    return (
        <details className="blog-faq" open={defaultOpen}>
            <summary>{question}</summary>
            <div className="faq-content">
                {children}
            </div>
        </details>
    );
};

export default BlogFAQ;
