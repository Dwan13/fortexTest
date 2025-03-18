'use server';
import BaseContainerLayout from 'app/components/layout/BaseContainerLayout';
import Utils from 'app/global/utilities/utils.module.scss';


export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<BaseContainerLayout>
			<main className={Utils.layout__main}>{children}</main>
		</BaseContainerLayout>
	);
}
