import classNames from 'classnames'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { getPageAllow } from '../../helpers/abac'


const Link = ({
  context,
  rules,
  href,
  className,
  activeClassName,
  children,
  ...other
}) => {
  const { asPath } = useRouter()
  const linkActive = (new RegExp(`^${href}`)).test(asPath)
  const pageAllow = getPageAllow({ context, rules, path: href })
  if (!pageAllow.access) {
    return (
      <div className={className} {...other}>{children}</div>
    )
  }
  return (
    <NextLink href={href} {...other}>
      <a className={classNames(className, linkActive && activeClassName)} >
        {children}
      </a>
    </NextLink>
  )
}

export default Link
