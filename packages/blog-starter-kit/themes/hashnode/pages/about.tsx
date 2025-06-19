import CustomImage from '../components/custom-image';
import PublicationSubscribeStandOut from '../components/publication-subscribe-standout';
import {resizeImage} from '../utils/image';
import {AppProvider} from '../components/contexts/appContext';

import BlogPostPreview from '../components/magazine-blog-post-preview';
import {
    NewsletterDocument,
    NewsletterQueryVariables,
    PostThumbnailFragment,
    PublicationFragment,
} from '../generated/graphql';
import {createHeaders, createSSRExchange, getUrqlClientConfig} from '../lib/api/client';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {log as _log} from 'next-axiom';
import {initUrqlClient} from 'next-urql';
import {Header} from '../components/header';
import PublicationFooter from '../components/publication-footer';
import AboutAuthor from "../components/about-author";

type Props = {
    publication: PublicationFragment;
    recent3Posts: PostThumbnailFragment[];
    currentMenuId: string;
}

const About = (props: Props) => {
    const {recent3Posts, publication, currentMenuId} = props;

    const profile = publication.author;

    const recentPosts = recent3Posts.map((post: any) => (
        <BlogPostPreview key={post.id} post={post} publication={publication}/>
    ));
    const originalImageSrc =
        publication.favicon ||
        profile?.profilePicture ||
        'https://cdn.hashnode.com/res/hashnode/image/upload/v1600792675173/rY-APy9Fc.png';

    const publicationImageUrl = resizeImage(originalImageSrc, {w: 400, h: 400, c: 'face'});

    return (
        <AppProvider publication={publication}>
            <Header currentMenuId={currentMenuId} isHome={false}/>
            <div className="blog-page-area mx-auto min-h-screen px-4 pb-8 pt-20 md:px-10 md:pt-20">
                <div
                    className="blog-page-card container relative z-30 mx-auto grid grid-flow-row grid-cols-8 pb-0 2xl:grid-cols-10">
                    <div className="col-span-full">
                        <section className="bg-white dark:bg-gray-900">
                            <div className="container px-6 py-10 mx-auto">
                                <div className="text-center">
                                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">About
                                        the Authors</h2>
                                    <p className="mt-4 text-gray-500 dark:text-gray-400">Meet the individuals
                                        behind this blog.</p>
                                </div>

                                <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
                                    <div
                                        className="flex flex-col items-center p-8 transition-colors duration-300 transform border rounded-xl hover:border-transparent group hover:bg-blue-600 dark:border-gray-700 dark:hover:border-transparent">
                                        <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
                                             src="/assets/blog/authors/anshul.png"
                                             alt="Person 1"/>

                                        <h3 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">Anshul
                                            Sanghi</h3>

                                        <p className="mt-2 text-gray-500 dark:text-gray-300 group-hover:text-gray-300">Senior
                                            Rust Engineer @ hostettler ag</p>

                                        <p className="mt-4 text-center text-gray-500 dark:text-gray-400 group-hover:text-gray-200">
                                            Anshul is a full-stack engineer specializing in Rust and TypeScript, with a
                                            strong emphasis on high-performance backend systems and image processing and
                                            analysis tools. In addition to their technical expertise, He has a
                                            passion for infrared and astrophotography. He is also a science & space
                                            enthusiast and likes to write about the science behind photography.
                                        </p>

                                        <div className="flex mt-4 -mx-2">
                                            {/*<a href="#"*/}
                                            {/*   className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"*/}
                                            {/*   aria-label="LinkedIn">*/}
                                            {/*    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none"*/}
                                            {/*         xmlns="http://www.w3.org/2000/svg">*/}
                                            {/*        <path*/}
                                            {/*            d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.717C5.506 6.717 4.695 5.908 4.695 4.915C4.695 3.923 5.506 3.113 6.5 3.113C7.494 3.113 8.305 3.923 8.305 4.915C8.305 5.908 7.494 6.717 6.5 6.717ZM20 19H17V13.396C17 10.026 16.974 6 13.5 6C10.026 6 9.5 9.513 9.5 13.136V19H6.5V8H9.5V9.452H9.548C9.963 8.587 11.303 7.826 12.974 7.826C16.448 7.826 17 9.874 17 12.634V19H20V19Z"/>*/}
                                            {/*    </svg>*/}
                                            {/*</a>*/}
                                        </div>
                                    </div>

                                    <div
                                        className="flex flex-col items-center p-8 transition-colors duration-300 transform border rounded-xl hover:border-transparent group hover:bg-blue-600 dark:border-gray-700 dark:hover:border-transparent">
                                        <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300"
                                             src="/assets/blog/authors/nishank.png"
                                             alt="Person 2"/>

                                        <h3 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">Nishank
                                            Kumbhalwar</h3>

                                        <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">Product
                                            Designer | Crafting beautiful interfaces</p>

                                        <p className="mt-4 text-center text-gray-500 dark:text-gray-400 group-hover:text-gray-200">
                                            A Product Designer from India with a deep passion for crafting digital
                                            products that enhance people's lives. He focuses on making everyday
                                            interactions with technology smoother, more intuitive, and more enjoyable.
                                            His work reflects a perfect blend of creativity, problem-solving, and
                                            technical expertise, allowing him to seamlessly bridge the gap between
                                            aesthetics and functionality.
                                        </p>

                                        <div className="flex mt-4 -mx-2">
                                            {/*<a href="#"*/}
                                            {/*   className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"*/}
                                            {/*   aria-label="LinkedIn">*/}
                                            {/*    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none"*/}
                                            {/*         xmlns="http://www.w3.org/2000/svg">*/}
                                            {/*        <path*/}
                                            {/*            d="M19 0H5C2.239 0 0 2.239 0 5V19C0 21.761 2.239 24 5 24H19C21.762 24 24 21.761 24 19V5C24 2.239 21.762 0 19 0ZM8 19H5V8H8V19ZM6.5 6.717C5.506 6.717 4.695 5.908 4.695 4.915C4.695 3.923 5.506 3.113 6.5 3.113C7.494 3.113 8.305 3.923 8.305 4.915C8.305 5.908 7.494 6.717 6.5 6.717ZM20 19H17V13.396C17 10.026 16.974 6 13.5 6C10.026 6 9.5 9.513 9.5 13.136V19H6.5V8H9.5V9.452H9.548C9.963 8.587 11.303 7.826 12.974 7.826C16.448 7.826 17 9.874 17 12.634V19H20V19Z"/>*/}
                                            {/*    </svg>*/}
                                            {/*</a>*/}

                                            {/*<a href="#"*/}
                                            {/*   className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"*/}
                                            {/*   aria-label="Twitter">*/}
                                            {/*    <svg className="w-6 h-6 fill-current" viewBox="0 0 512 512">*/}
                                            {/*        <path*/}
                                            {/*            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.214 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>*/}
                                            {/*    </svg>*/}
                                            {/*</a>*/}

                                            {/*<a href="#"*/}
                                            {/*   className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white"*/}
                                            {/*   aria-label="Github">*/}
                                            {/*    <svg className="w-6 h-6 fill-current" viewBox="0 0 512 512">*/}
                                            {/*        <path*/}
                                            {/*            d="M256 0C114.6 0 0 114.6 0 256c0 113.1 73.3 209.1 174.6 242.9.8.1 1.2-.3 1.2-.7v-3.2c0-1.6-.6-3.7-1.1-5.3-13.5-4.9-29.2-16.7-31.3-33.3-3.6-9.1-13.2-18.8-23-22.3-9.1-3.2-14.8-1.5-14.8-1.5s9.1 1.5 15.9 10.1c6.8 8.6 18.8 24.2 46.7 24.2 28.1 0 40.5-11.7 40.5-11.7s-2.1 7.2-2.1 12.9c0 10.1 0 20.2 0 24.2.1.4.5.8 1.3.7C438.7 465.1 512 369.1 512 256C512 114.6 397.4 0 256 0z"/>*/}
                                            {/*    </svg>*/}
                                            {/*</a>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
                {recent3Posts && recent3Posts.length > 0 && (
                    <>
                        <div className="blog-more-articles mt-10">
                            <h3 className="mb-3 text-center font-heading text-xl font-bold text-slate-900 dark:text-slate-50">
                                Recent articles
                            </h3>
                        </div>
                        <div
                            className="blog-articles-container container mx-auto grid grid-cols-1 gap-10 px-4 md:grid-cols-2 lg:grid-cols-3 xl:px-10 xl:py-10 2xl:px-24 2xl:py-5">
                            {recentPosts}
                        </div>
                    </>
                )}
                <div className="col-span-full max-w-3xl mx-auto">
                    <section className="bg-white dark:bg-gray-900">
                        <div className="container px-6 py-10 ">
                            <div className="text-center">
                                <h4 className="text-2xl font-bold text-gray-800 dark:text-white">Content
                                    Transparency Declaration</h4>
                                <p className="mt-4 text-gray-500 dark:text-gray-400">While most of the content ideas
                                    and structure were done by the authors, AI was utilised for researching each
                                    topic deeply. The authors then verified the information provided by AI before
                                    using it in the content of the blogs.</p>
                                <p className="mt-4 text-gray-500 dark:text-gray-400">English being a second language
                                    for both the authors, AI tools are also utilised after the initial draft
                                    to make corrections and improve clarity when conveying information written by
                                    the authors.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            {publication ? (
                <PublicationFooter
                    authorName={publication.author.name}
                    title={publication.title}
                    imprint={publication.imprint}
                    disableFooterBranding={publication.preferences.disableFooterBranding}
                    isTeam={publication.isTeam}
                    logo={publication.preferences.logo}
                    darkMode={publication.preferences.darkMode}
                />
            ) : null}
        </AppProvider>
    );
};

export const getServerSideProps: GetServerSideProps<{
    publication: PublicationFragment;
    recent3Posts: PostThumbnailFragment[];
}> = async (ctx) => {
    const {req, res, query} = ctx;
    const host = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST;
    const log = _log.with({host});

    const ssrCache = createSSRExchange();
    const urqlClient = initUrqlClient(getUrqlClientConfig(ssrCache), false);

    const gqlVariables: NewsletterQueryVariables = {
        host,
        slug: 'newsletter',
    };
    const publicationInfo = await urqlClient
        .query(NewsletterDocument, gqlVariables, {
            fetchOptions: {
                headers: createHeaders(),
            },
            requestPolicy: 'network-only',
        })
        .toPromise();

    if (publicationInfo.error) {
        log.error('Error while fetching publication info', {
            variables: gqlVariables,
            error: publicationInfo.error,
        });
        throw publicationInfo.error;
    }
    if (!publicationInfo.data?.publication) {
        log.error('Publication not found fetching publication info; returning 404', {
            variables: gqlVariables,
        });
        res.setHeader('cache-control', 's-maxage=3, stale-while-revalidate');
        return {
            notFound: true,
        };
    }

    const {publication} = publicationInfo.data;

    if (!publication.preferences.enabledPages?.newsletter) {
        return {
            notFound: true,
        };
    }

    if (process.env.PREVIEW_MODE) {
        res.setHeader('cache-control', 'no-cache');
    }

    res.setHeader('Cache-Control', 's-maxage=3, stale-while-revalidate');

    const isDarkTheme =
        typeof query.isDarkTheme === 'undefined'
            ? !!publication.preferences.darkMode?.enabled
            : query.isDarkTheme === 'true';
    // @ts-ignore
    req.isDarkTheme = isDarkTheme;

    return {
        props: {
            publication,
            recent3Posts: publication.recentPosts.edges.map((edge) => edge.node),
            currentMenuId: 'about'
        },
    };
};

export default About;
