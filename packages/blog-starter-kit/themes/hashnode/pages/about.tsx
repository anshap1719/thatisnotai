import {AppProvider} from '../components/contexts/appContext';

import BlogPostPreview from '../components/magazine-blog-post-preview';
import {
    NewsletterDocument,
    NewsletterQueryVariables,
    PostThumbnailFragment,
    PublicationFragment,
} from '../generated/graphql';
import {createHeaders, createSSRExchange, getUrqlClientConfig} from '../lib/api/client';
import {GetServerSideProps} from 'next';
import {log as _log} from 'next-axiom';
import {initUrqlClient} from 'next-urql';
import {Header} from '../components/header';
import PublicationFooter from '../components/publication-footer';

type Props = {
    publication: PublicationFragment;
    recent3Posts: PostThumbnailFragment[];
    currentMenuId: string;
}

const About = (props: Props) => {
    const {recent3Posts, publication, currentMenuId} = props;

    const recentPosts = recent3Posts.map((post: any) => (
        <BlogPostPreview key={post.id} post={post} publication={publication}/>
    ));

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
                                            products that enhance people&apos;s lives. He focuses on making everyday
                                            interactions with technology smoother, more intuitive, and more enjoyable.
                                            His work reflects a perfect blend of creativity, problem-solving, and
                                            technical expertise, allowing him to seamlessly bridge the gap between
                                            aesthetics and functionality.
                                        </p>
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
