import { notFound } from 'next/navigation';
import { MY_EXPERIENCE } from '@/lib/data';
import { Metadata } from 'next';
import ExperienceDetails from './_components/ExperienceDetails';

export const generateStaticParams = async () => {
    return MY_EXPERIENCE.map((experience) => ({ slug: experience.slug }));
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const experience = MY_EXPERIENCE.find(
        (experience) => experience.slug === slug,
    );

    return {
        title: `${experience?.title} at ${experience?.company}`,
        description: experience?.summary,
    } as Metadata;
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const experience = MY_EXPERIENCE.find(
        (experience) => experience.slug === slug,
    );

    if (!experience) {
        return notFound();
    }

    return <ExperienceDetails experience={experience} />;
};

export default Page;
