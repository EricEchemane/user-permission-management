'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const searcInput = form.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (searcInput.value) {
      newParams.set('q', searcInput.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/', newParams));
  }

  return (
    <form
      onSubmit={onSubmit}
      className='w-max-[550px] relative w-full lg:w-80 xl:w-full'
    >
      <input
        type='text'
        name='search'
        placeholder='Search for banks...'
        autoComplete='off'
        defaultValue={searchParams?.get('q') ?? ''}
        className='w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400'
      />
      <div className='absolute right-0 top-0 mr-3 flex h-full items-center'>
        <MagnifyingGlassIcon className='h-4' />
      </div>
    </form>
  );
}
