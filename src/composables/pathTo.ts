import { useRouter } from 'vue-router';

export default function usePathTo() {
    const router = useRouter();
    const pathTo = (path: string, query?: any) => {
        router.push({
            path: path,
            query: query || {}
        }).then();
    };

    return {
        pathTo
    };
}
