import Link from 'next/link';
import Image from 'next/image';

import Container from '@/components/Container';


export default function About() {
  return (
    <Container title="About – Felix Koppe">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="flex flex-col md:flex-row items-end">
          <div>
            <Image
              alt={`2019 Year in Review`}
              src={`/me-min.png`}
              width={300}
              height={450}
              priority
            />
          </div>
          <div className="ml-4 flex-shrink md:w-2/6 prose leading-6 text-gray-600 dark:text-gray-400">
            <p>
              Hi, I’m Felix. I'm a technophile designer, developer and creator.&nbsp; <br />
              I work at&nbsp;
              <a
                className="no-underline"
                href="https://cavorit.de/"
                target="_blank"
                rel="noopener noreferrer"
              >▲Cavorit</a>&nbsp;as a Systems Design Architect.
            </p>
            <p>
              I grew up in the Bauhaus City of Dessau, and still live here. But I'm also a lot in Berlin.<br/>
              I am currently studying Integrated Design at Dessau Department of Design.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
